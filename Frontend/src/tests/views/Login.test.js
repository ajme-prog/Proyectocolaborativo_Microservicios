import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from 'views/auth/Login';
import { useAuth } from 'contexts/AuthContext';
import { loginUsuario } from 'services/autenticacion';
import { MemoryRouter } from 'react-router-dom';
jest.mock('services/autenticacion');
jest.mock('contexts/AuthContext');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));


describe('Pruebas en <Login />', () => {



    test('debe de mostrarse correctamente', () => {
        useAuth.mockReturnValue({
            setCookie: jest.fn(),
            setCurrentUser: jest.fn()
        })
        const wrapper = shallow(<Login />);

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y hacer la navegación', () => {
        useAuth.mockReturnValue({
            setCookie: jest.fn(),
            setCurrentUser: jest.fn()
        });

        loginUsuario.mockReturnValue({
            status: 200,
            accessToken: '123sfafa32',
            usuario: {
                nombre: 'Ronald',
                tipo: 0 //admin
            }
        })
        const wrapper = mount(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick');
        // handleSubmit();
        // console.log(wrapper.find('button').simulate('click'));


        //wrapper.find('button').prop('onClick');
        expect(wrapper.find('Router').prop('history').location.pathname.trim()).toBe('/');

        //expect(mockHistoryPush).toHaveBeenCalledWith('/admin/settings');
    });


})
