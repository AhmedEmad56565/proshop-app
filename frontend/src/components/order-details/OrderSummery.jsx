import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

import {
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../../store/slices/ordersApiSlice';

import Loader from '../Loader';

export default function OrderSummery({ order, refetch, orderId }) {
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is successfully paid.');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((ordId) => {
        return ordId;
      });
  }

  async function handleUpdateToDelivered() {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order marked as delivered successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Order is not Found');
    }
  }

  return (
    <Card className='rounded'>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${order.itemsPrice}</Col>
          </Row>

          <Row>
            <Col>Shipping</Col>
            <Col>${order.shippingPrice}</Col>
          </Row>

          <Row>
            <Col>Tax</Col>
            <Col>${order.taxPrice}</Col>
          </Row>

          <Row>
            <Col>Total</Col>
            <Col>${order.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        {userInfo.isAdmin && order.isPaid && !order.isDelivered ? (
          <ListGroup.Item>
            {loadingDeliver && <Loader />}
            <Button
              className='w-100 text-light'
              variant='success'
              onClick={handleUpdateToDelivered}
            >
              Mark as Delivered
            </Button>
          </ListGroup.Item>
        ) : !userInfo.isAdmin && !order.isPaid ? (
          <ListGroup.Item>
            {loadingPay && <Loader />}

            {isPending ? (
              <Loader />
            ) : (
              <div>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                ></PayPalButtons>
              </div>
            )}
          </ListGroup.Item>
        ) : null}
      </ListGroup>
    </Card>
  );
}
