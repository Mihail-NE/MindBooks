import { useEffect, useState } from "react";
import BookCard from "../BookCad/BookCad";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startIndex, setStartIndex] = useState(10);

    const fetchBooks = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=psychology&langRestrict=ru&maxResults=${startIndex}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setBooks(data.items);
            console.log(books);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const showMore = () => {
        setStartIndex((prevIndex) => prevIndex + 10);
    };

    useEffect(() => {
        fetchBooks();
    }, [startIndex]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="grid grid-cols-2 w-full m-auto p-16 gap-10 gap-x-10">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors?.[0]}
                    cover={book.volumeInfo.imageLinks?.thumbnail}
                    price={book.saleInfo.listPrice?.amount}
                    currency={book.saleInfo.listPrice?.currencyCode}
                    publishedDate={book.volumeInfo.publishedDate}
                    publisher={book.volumeInfo.publisher}
                    pageCount={book.volumeInfo.pageCount}
                    isbn={book.volumeInfo.industryIdentifiers?.[0]?.identifier}
                    language={book.volumeInfo.language}
                    categories={book.volumeInfo.categories}
                    buyLink={book.saleInfo.buyLink}
                    previewLink={book.volumeInfo.previewLink}
                    pdfAvailable={book.accessInfo.pdf?.isAvailable}
                    epubAvailable={book.accessInfo.epub?.isAvailable}
                    maturityRating={book.volumeInfo.maturityRating}
                    printType={book.volumeInfo.printType}
                />
            ))}
            {startIndex === 40 ? (
                ""
            ) : (
                <button onClick={showMore}>Показать еще</button>
            )}
        </div>
    );
};

export default BookList;
