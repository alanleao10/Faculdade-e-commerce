import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";



const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const checkoutData = {
      data,
      products: productsInCart,
      subtotal: subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    let response;
    if (JSON.parse(localStorage.getItem("user") || "{}").email) {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        user: {
          email: JSON.parse(localStorage.getItem("user") || "{}").email,
          id: JSON.parse(localStorage.getItem("user") || "{}").id,
        },
        orderStatus: "Processamento",
        orderDate: new Date().toISOString(),
      });
    } else {
      response = await customFetch.post("/pedidos", {
        ...checkoutData,
        orderStatus: "Processamento",
        orderDate: new Date().toLocaleDateString(),
      });
    }

    if (response.status === 201) {
      toast.success("O pedido foi feito com sucesso");
      navigate("/confirmação de pedido");
    } else {
      toast.error("Algo deu errado, tente novamente mais tarde");
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="pb-24 pt-16 px-5 max-[400px]:px-3">
        <h2 className="sr-only">Confira</h2>

        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
              Informações de contato
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="endereço de email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Endereço de email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="emailAddress"
                    autoComplete="email"
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
              Informações de envio
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="primeiro nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Primeiro nome
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="Primeiro nome"
                      name="Primeiro nome"
                      autoComplete="given-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sobrenome
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="Sobrenome"
                      name="Sobrenome"
                      autoComplete="family-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="Empresa"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Empresa
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Empresa"
                      id="Empresa"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="Endereço"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Endereço
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Endereço"
                      id="Endereço"
                      autoComplete="street-address"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="Apartamento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartamento, suíte, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Apartamento"
                      id="Apartamento"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cidaede
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Cidaede"
                      id="Cidaede"
                      autoComplete="address-level2"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="País"
                    className="block text-sm font-medium text-gray-700"
                  >
                    País
                  </label>
                  <div className="mt-1">
                    <select
                      id="País"
                      name="País"
                      autoComplete="country-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>Brasil</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Estado"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estado
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Estado"
                      id="Estado"
                      autoComplete="address-level1"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Código postal"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Código postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Código postal"
                      id="Código postal"
                      autoComplete="postal-code"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="Telefone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="Telefone"
                      id="Tefefone"
                      autoComplete="tel"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Pagamento</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Tipo de pagamento</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="paymentType"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="paymentType"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                <div className="col-span-4">
                  <label
                    htmlFor="Número do cartão"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número do cartão
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="Número do cartão"
                      name="Número do cartão"
                      autoComplete="cc-number"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome no cartão
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="Nome no cartão"
                      name="Nome no cartão"
                      autoComplete="cc-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Data de validade (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expirationDate"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do pedido */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Resumo do pedido</h2>

            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Itens no seu carrinho</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.map((product) => (
                  <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={`/src/assets/${product?.image}`}
                        alt={product?.title}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {product?.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              dispatch(
                                removeProductFromTheCart({ id: product?.id })
                              )
                            }
                          >
                            <span className="sr-only">Remover</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product?.price}
                        </p>

                        <div className="ml-4">
                          <p className="text-base">
                          Quantidade: {product?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Envio</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Impostos</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? subtotal / 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${subtotal ? subtotal + 5 + subtotal / 5 : 0}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button text="Confirmar pedido" mode="brown" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;
