import { describe, it, expect } from "vitest";
import { userlogin } from "../src/pages/Login";

describe('Función de inicio de sesión', () => {
    it('debería iniciar sesión correctamente', async () => {
      expect(userlogin({email:"paolamenesescalderon@gmail.com",password: "12345678"})).toBe(true);
    });

    it('debería fallar el iniciar sesión', async () => {
      expect(userlogin({email:"abbyposada@gmail.com",password: "12345678"})).not.toBe(true);
    });
  
    /*it('debería fallar con credenciales inválidas', async () => {
      // Simulación de credenciales inválidas
      const invalidUser = { email: 'usuarioinvalido@example.com', password: 'contraseñaincorrecta' };
  
      try {
        // Llama a la función de inicio de sesión con credenciales inválidas
        await login(invalidUser.email, invalidUser.password);
        // Si la función no lanza una excepción, la prueba falla
        throw new Error('Se esperaba que la función lanzara una excepción');
      } catch (error) {
        // Aquí puedes verificar el tipo de error u otro comportamiento esperado
        expect(error.message).toBe('Credenciales inválidas');
      }
    });*/
  });
  