import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import OrderFormPage from './order-form-page';

describe('Order Form', () => {
    test('renders order form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderFormPage />
                </MemoryRouter>
            </Provider>
        );

    })
});