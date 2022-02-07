import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import OrderFormPage from './order-form-page';

describe('Order Form Page', () => {
    test('renders order form page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <OrderFormPage />
                </MemoryRouter>
            </Provider>
        );

    })
});