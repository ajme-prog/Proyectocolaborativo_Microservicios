import React from 'react';
import { mount, shallow } from 'enzyme';
import PrivateRoute from '../../components/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';



describe('Pruebas en PrivateRoute', () => {
    test('debe bloquear el componente si no está autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>{/**Nos permite falsear las rutas para hacer pruebas a un router sin estar en uno. */}
                <PrivateRoute
                    component={() => <span>Listo!</span>} //un componente es una funcion!! Porque se trata de un functional component.
                />
            </MemoryRouter>
        );//debemos usar mount porque shallow no renderiza a fondo

        expect(wrapper.find('span').exists()).toBe(false);
    });

    test('debe de mostrarse el componente login si no está autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>{/**Nos permite falsear las rutas para hacer pruebas a un router sin estar en uno. */}
                <PrivateRoute
                    component={() => <span>Listo!</span>} //un componente es una funcion!! Porque se trata de un functional component.
                />
            </MemoryRouter>
        );//debemos usar mount porque shallow no renderiza a fondo
        expect(wrapper.find('Router').prop('history').location.pathname.trim()).toBe('/auth/login');
    });

});
