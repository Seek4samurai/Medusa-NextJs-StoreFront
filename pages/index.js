import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import StoreContext from "../context/store-context";
import MedusaLogo from "../public/medusa-logo.svg";
import field from "../public/fieldSvg.svg";
import styles from "../styles/landing-page.module.css";
import store from "../styles/store.module.css";
import footer from "../styles/footer.module.css";
import { createClient } from "../utils/client";
import { formatPrices } from "../utils/prices";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <h1 style={{ margin: 0 }}>Medusa</h1>
            <h1 style={{ margin: 0 }}>+</h1>
            <h1 style={{ margin: 0 }}>Next.js starter</h1>
          </div>
          <div className={styles.links}>
            <a
              href="https://docs.medusa-commerce.com/"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
              style={{ background: "#56FBB1", color: "#30363d" }}
            >
              Read the docs
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/medusajs/nextjs-starter-medusa"
              target="_blank"
              rel="noreferrer"
              role="button"
              className={styles.btn}
            >
              View on GitHub
              <FaGithub />
            </a>
          </div>
          <p className={styles.description}>
            Build blazing-fast client applications on top of a modular headless
            commerce engine. Integrate seamlessly with any 3rd party tools for a
            best-in-breed commerce stack.
          </p>
        </div>
        <div className={styles.scrollIcon}>
          <AiFillCaretDown size={50}></AiFillCaretDown>
        </div>
        <div className={styles.canvas}>
          <Image src={field} alt="field" layout="responsive"></Image>
        </div>
        <div className={store.container}>
          <h1 className={store.title}>Check out our store</h1>
          <div className={store.circles}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={store.products}>
            <div className={store.grid}>
              {products &&
                products.map((p) => {
                  return (
                    <div key={p.id} className={store.card}>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: p.id },
                        }}
                        passHref
                      >
                        <a target="_blank">
                          <h2>{p.title}</h2>
                          <div className={store.imgHolder}>
                            <Image
                              src={p.thumbnail}
                              alt="thumbnail"
                              width={400}
                              height={500}
                            ></Image>
                          </div>
                          <p>{p.description}</p>
                          <p>{formatPrices(cart, p.variants[0])}</p>
                        </a>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
      <footer className={footer.container}>
        <div className={footer.main}>
          <div className={footer.listA}>
            <Link href="/">
              <a style={{ width: "125px" }}>
                <Image src={MedusaLogo} height="40px" width="100%" alt="logo" />
              </a>
            </Link>
            <span>© 2022 Medusa – All Rights Reserved</span>
            <span>
              Catch us on{" "}
              <Link href="https://ky5eo2x1u81.typeform.com/get-in-touch">
                <a style={{ fontWeight: "bold" }} target="_blank">
                  hello@medusajs.com
                </a>
              </Link>
            </span>
          </div>
          <div className={footer.listA}>
            <h4>Docs</h4>
            <li>
              <Link href="https://docs.medusajs.com/tutorial/set-up-your-development-environment/">
                <a target="_blank">Tutorial</a>
              </Link>
            </li>
          </div>
          <div className={footer.listA}>
            <h4>Community</h4>
            <li>
              <Link href="https://twitter.com/medusajs">
                <a target="_blank">Twitter</a>
              </Link>
            </li>
            <li>
              <Link href="https://discord.com/invite/medusajs">
                <a target="_blank">Discord</a>
              </Link>
            </li>
          </div>
          <div className={footer.listA}>
            <h4>More</h4>
            <li>
              <Link href="https://medusajs.com/">
                <a target="_blank">Medusa Home</a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/medusajs/medusa">
                <a target="_blank">GitHub Repo</a>
              </Link>
            </li>
            <li>
              <Link href="https://ky5eo2x1u81.typeform.com/get-in-touch">
                <a target="_blank">Contact us</a>
              </Link>
            </li>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
