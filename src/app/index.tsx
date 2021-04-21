import { useState, useEffect } from "react";
import { Layout } from "antd";
import cn from "classnames";

import Routing from "pages";
import { withHocs } from "./hocs";
import { ReactComponent as Logo } from "./logo.svg";
import styles from "./styles.module.scss";
import "./index.scss";

// FIXME: Улучшить реализацию
const STICKY_LIMIT = 1080 - 170; // Screen - Header - Magic Offse ;D

// FIXME: Улучшить реализацию (ref/event?)
const useSticky = () => {
    const [isSticky, setSticky] = useState(true);
    const handleScroll = () => {
        setSticky(window.scrollY < STICKY_LIMIT);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", () => handleScroll);
        };
    }, []);

    return { isSticky };
};

function App() {
    const { isSticky } = useSticky();
    return (
        <div className={styles.h100}>
            <Layout>
                <Layout.Header className={cn(styles.header, { [styles.headerSticky]: isSticky })}>
                    <Logo width={24} />
                    <h1 className={styles.headerTitle}>sharead</h1>
                </Layout.Header>
                <Layout.Content className={cn(styles.content)}>
                    <Routing />
                </Layout.Content>
                <Layout.Footer className={styles.footer}>
                    Sharead ©2021 Created by{" "}
                    <a href="https://github.com/select-name" target="_blank" rel="noreferrer">
                        SelectName team
                    </a>
                </Layout.Footer>
            </Layout>
        </div>
    );
}

export default withHocs(App);
