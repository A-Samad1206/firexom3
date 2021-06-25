import { db } from '#firebase';
import firebase from 'firebase';

export const createOrder = async (values, carts, userId) => {
  const orderRef = db.collection('users').doc(userId).collection('orders');
  const { paymentMethod, ...rest } = values;

  const order = {
    items: carts,
    payment: { paymentMethod, paid: false },
    shippingAddress: { ...rest },
    invoice: {
      totalPrice:
        carts && carts.reduce((total, cart) => total + cart.itemPrice, 0),
      status: {
        paid: false,
        isDelivered: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    },
  };
  try {
    const createdOrder = await orderRef.add(order);
    return createdOrder.id;
  } catch (err) {
    return false;
  }
};

export const getOrder = async (userId, orderId) => {
  try {
    const doc = await db
      .collection('users')
      .doc(userId)
      .collection('orders')
      .doc(orderId)
      .get();
    return { data: { ...doc.data(), id: doc.id } };
  } catch (err) {
    console.log('Error from get Order', err);
    return { data: false };
  }
};
export const updateOrder = async (userId, orderId, obj) => {
  try {
    const paymentDetails = await getOrder(userId, orderId);
    if (!paymentDetails?.payment?.paid) {
      const orderRef = await db
        .collection('users')
        .doc(userId)
        .collection('orders')
        .doc(orderId);

      await orderRef.set(
        {
          payment: {
            paidAt: firebase.firestore.FieldValue.serverTimestamp(),
            paid: true,
            ...obj,
          },
        },
        { merge: true }
      );
      return {
        success: true,
        paymentDetails: obj,
        alreadyPaid: false,
      };
    }
    return { alreadyPaid: true };
  } catch (err) {
    console.log('Error from order update', err);
    return { success: false };
  }
};
