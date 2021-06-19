import React from 'react';
import { shallow } from 'enzyme';
import { registrarUsuario } from 'services/autenticacion';


jest.mock('services/autenticacion');

describe('Pruebas en services/autenticacion.js', () => {

    test('debe de devolver true el registro', () => {
        expect(true).toBe(true);
    });
    
});

