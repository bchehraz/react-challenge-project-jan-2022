import React from 'react';
import { render, screen } from '@testing-library/react';

import OrdersList from './ordersList';

describe('Orders List', () => {
    test('renders with no prop', () => {
        render(
            <OrdersList
            />
        )
        const emptyDiv = document.getElementsByClassName('empty-orders');
        const arr = Array.from(emptyDiv);
        expect(arr.length).toBe(1);
    });

    test('renders one order', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
    });

    test('renders multiple orders', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            },
            {
                order_item: "Drink",
                quantity: "888",
                _id: 2
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText('Drink')).toBeInTheDocument();
        expect(screen.getByText(/^.*888.*$/gm)).toBeInTheDocument();

    });

    test('renders a single order with a midnight timestamp in proper hh:mm:ss format', () => {
      const orders = [
        {
            order_item: "Pasta",
            quantity: "1",
            _id: 1,
            createdAt: "2022-01-30T08:00:00.973Z"
        },
      ];
      render(
        <OrdersList
            orders={orders}
        />
      )
      expect(screen.getByText('Order placed at 24:00:00')).toBeInTheDocument();
    })

    test('renders a single order with 1:05 AM timestamp in proper hh:mm:ss format', () => {
      const orders = [
        {
            order_item: "Food",
            quantity: "35",
            _id: 1,
            createdAt: "2022-01-30T09:05:09.973Z"
        },
      ];
      render(
        <OrdersList
            orders={orders}
        />
      )
      expect(screen.getByText('Order placed at 01:05:09')).toBeInTheDocument();
    });
})