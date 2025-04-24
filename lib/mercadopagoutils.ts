"use client";

let mercadoPagoInitialized = false;

export const loadMercadoPago = (publicKey: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      mercadoPagoInitialized = true;
      resolve(new window.MercadoPago(publicKey));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    script.onload = () => {
      mercadoPagoInitialized = true;
      resolve(new window.MercadoPago(publicKey));
    };
    script.onerror = () => {
      reject(new Error("Failed to load MercadoPago SDK"));
    };
    document.body.appendChild(script);
  });
};

export const initCardForm = (
  mp: any,
  amount: string,
  formContainerId: string,
  onSubmitCallback: (formData: any) => void,
  onFormMountedCallback?: (error?: any) => void,
  onFetchingCallback?: (resource: string) => () => void
) => {
  return mp.cardForm({
    amount,
    iframe: true,
    form: {
      id: formContainerId,
      cardNumber: {
        id: `${formContainerId}__cardNumber`,
        placeholder: "Número de tarjeta",
      },
      expirationDate: {
        id: `${formContainerId}__expirationDate`,
        placeholder: "MM/YY",
      },
      securityCode: {
        id: `${formContainerId}__securityCode`,
        placeholder: "Código de seguridad",
      },
      cardholderName: {
        id: `${formContainerId}__cardholderName`,
        placeholder: "Titular de la tarjeta",
      },
      issuer: {
        id: `${formContainerId}__issuer`,
        placeholder: "Banco emisor",
      },
      installments: {
        id: `${formContainerId}__installments`,
        placeholder: "Cuotas",
      },
      identificationType: {
        id: `${formContainerId}__identificationType`,
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: `${formContainerId}__identificationNumber`,
        placeholder: "Número del documento",
      },
      cardholderEmail: {
        id: `${formContainerId}__cardholderEmail`,
        placeholder: "E-mail",
      },
    },
    callbacks: {
      onFormMounted: (error: any) => {
        if (onFormMountedCallback) {
          onFormMountedCallback(error);
        } else if (error) {
          console.warn("Form Mounted handling error: ", error);
        } else {
          console.log("Form mounted");
        }
      },
      onSubmit: (event: Event) => {
        event.preventDefault();
        const formData = mp.cardForm.getCardFormData();
        onSubmitCallback(formData);
      },
      onFetching: (resource: string) => {
        if (onFetchingCallback) {
          return onFetchingCallback(resource);
        }

        console.log("Fetching resource: ", resource);
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
          progressBar.removeAttribute("value");
        }

        return () => {
          if (progressBar) {
            progressBar.setAttribute("value", "0");
          }
        };
      },
    },
  });
};
