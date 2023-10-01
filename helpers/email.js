import nodemailer from 'nodemailer';

const emailSenderConfirmAccount= async (datos)=>{
    const {nombre,email,token}=datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1a9863939c9ab2",
          pass: "c33aed3701e3ae"
        }
    });

    const infoEmail = await transport.sendMail({
        from:"Mensaje automatico confirma tu cuenta",
        to:email,
        subject:"Confirma tu cuenta",
        text:`${nombre} comprueba tu cuenta para seguir disfrutando de los beneficios`,
        html:`
            <body>
                <div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #007bff; color: #fff; text-align: center; padding: 10px;">
                        <h1>Confirmación de Cuenta de Correo</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                        <p>Hola ${nombre},</p>
                        <p>Gracias por registrarte en nuestro sitio web. Para confirmar tu cuenta de correo, por favor haz clic en el siguiente botón:</p>
                        <p><a href='http://localhost:5173/confirmation/${token}' style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Confirmar Cuenta</a></p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #888;">
                        <p>Este correo ha sido generado automáticamente. Por favor, no responder a este mensaje.</p>
                    </div>
                </div>
            </body>
        `
    })

}
const emailSenderRecoverPassword= async (datos)=>{
    const {nombre,email,token}=datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1a9863939c9ab2",
          pass: "c33aed3701e3ae"
        }
    });

    const infoEmail = await transport.sendMail({
        from:"Backend de Jaime Angel",
        to:email,
        subject:"Restablecer contraseña",
        text:`${nombre} Aqui puedes cambiar tu contraseña`,
        html:`
            <body>
                <div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #007bff; color: #fff; text-align: center; padding: 10px;">
                        <h1>Restablecer contraseña de tu cuenta</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                        <p>Hola ${nombre},</p>
                        <p>Te ayudaremos a restablecer tu contraseña, por favor haz clic en el siguiente botón:</p>
                        <p><a href='http://localhost:5173/recover-password/${token}' style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Restablecer contraseña</a></p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; color: #888;">
                        <p>Este correo ha sido generado automáticamente. Por favor, no responder a este mensaje.</p>
                    </div>
                </div>
            </body>
        `
    })

}

export {
    emailSenderConfirmAccount,
    emailSenderRecoverPassword
};