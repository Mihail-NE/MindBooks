import { Link } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { DataContext } from "../../shared/context/DataContext";
import { useContext } from "react";
import Button from "../../shared/components/Button/Button";

const BookCard = ({
    id,
    title,
    author,
    cover,
    price,
    currency,
    publishedDate,
    publisher,
    pageCount,
    categories,
    pdfAvailable,
    epubAvailable,
}) => {
    const { state, dispatch } = useContext(DataContext);

    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id,
                title,
                cover,
                price,
                quantity: 1,
            },
        });
    };

    const addToFavorites = () => {
        dispatch({
            type: "ADD_TO_FAVORITES",
            payload: {
                id,
                title,
                cover,
                price,
            },
        });
    };

    return (
        <div className="flex bg-white items-center shadow-md rounded-lg overflow-hidden w-[660px] mx-auto relative mobile:w-[300px] mobile:flex-col">
            <div className="h-[200px] w-32 bg-gray-200 flex  justify-center flex-shrink-0">
                {cover ? (
                    <img
                        src={cover}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="text-gray-500 text-sm">Нет изображения</div>
                )}
            </div>

            <div className="flex flex-col p-4 flex-grow">
                <div>
                    <h2 className="text-base text-wrap font-semibold text-gray-900 line-clamp-3 text-ellipsis">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2 truncate">
                        Автор: {author}
                    </p>
                </div>

                <p className="text-md font-bold text-gray-800 mb-3">
                    {price ? `${price} ${currency}` : "Цена не указана"}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                    <p>Дата: {publishedDate || "Не указана"}</p>
                    <p>Издатель: {publisher || "Не указан"}</p>
                    <p>Страницы: {pageCount || "N/A"}</p>
                    <p className="truncate">
                        Категории: {categories?.join(", ") || "Нет"}
                    </p>
                </div>

                <div className="mt-4 flex gap-2">
                    <Link
                        to={`/catalog/${id}`}
                        className="text-xs text-violet-500 hover:underline"
                    >
                        <Button size="small" type="secondary">
                            Подробнее
                        </Button>
                    </Link>
                </div>

                <div className="mt-3 text-xs text-gray-500">
                    PDF: {pdfAvailable ? "Да" : "Нет"} | EPUB:{" "}
                    {epubAvailable ? "Да" : "Нет"}
                </div>
            </div>
            <div className="flex absolute bottom-5 right-5 gap-4">
                <button
                    onClick={addToFavorites}
                    className="hover:text-violet-600 transition"
                >
                    <HeartIcon
                        className={`h-6 w-6 ${
                            state.favorites.some((item) => item.id === id)
                                ? "text-violet-500"
                                : ""
                        }`}
                    />
                </button>

                {price && (
                    <button
                        onClick={addToCart}
                        className="hover:text-violet-600 transition"
                    >
                        <ShoppingCartIcon
                            className={`h-6 w-6 ${
                                state.cart.some((item) => item.id === id)
                                    ? "text-violet-500"
                                    : ""
                            }`}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookCard;
