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
        from:"Backend de Jaime Angel",
        to:"jaimeangel1097@gmail.com",
        subject:"Confirma tu cuenta",
        text:`${nombre} comprueba tu cuenta para seguir disfrutando de los beneficios`,
        html:`
            <h1>Comprueba tu cuenta con HTML</h1>

            <a href='http://localhost:5173/confirmation/${token}'>Comprueba tu cuenta</a>
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
        to:"jaimeangel1097@gmail.com",
        subject:"Confirma tu cuenta",
        text:`${nombre} Aqui puedes cambiar tu contraseña`,
        html:`
            <h1>Cambia contraseña rapido Jaime</h1>

            <a href='http://localhost:5173/recover-password/${token}'>Cambia contraseña</a>
        `
    })

}

export {
    emailSenderConfirmAccount,
    emailSenderRecoverPassword
};