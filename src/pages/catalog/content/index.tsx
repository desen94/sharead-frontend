import { Empty, Layout } from "antd";

import { headerParams } from "features/header";
import { BookCard } from "entities/book";
import * as fapi from "shared/fixtures";
import * as catalogParams from "../params";
import styles from "./styles.module.scss";

const useFilters = () => {
    const { authors } = catalogParams.useFilterByAuthor();
    const { publishers } = catalogParams.useFilterByPublisher();
    const { categories } = catalogParams.useFilterByCategory();

    return { authors, publishers, categories };
};

const CatalogContent = () => {
    const params = headerParams.useSearchParam();
    const filters = useFilters();
    const booksQuery = fapi.books.getList({ search: params.search, ...filters });

    // FIXME: add later ListView
    // FIXME: Layout.Content?
    return (
        <Layout>
            <section className={styles.sort}>
                <b className={styles.sortLabel}>Сортировать по:</b>

                <ul className={styles.sortList}>
                    <li className={styles.sortListItem}>по популярности</li>
                    <li className={styles.sortListItem}>по цене аренды</li>
                    <li className={styles.sortListItem}>по сроку аренды</li>
                    <li className={styles.sortListItem}>по новизне</li>
                </ul>
            </section>
            <section className={styles.grid}>
                {booksQuery.map((b) => (
                    <BookCard key={b.id} data={b} className={styles.gridItem} />
                ))}
            </section>
            {booksQuery.length === 0 && (
                <Empty
                    className={styles.catalogPlaceholder}
                    description="Не удалось найти книги по вашему запросу"
                />
            )}
        </Layout>
    );
};

export default CatalogContent;
