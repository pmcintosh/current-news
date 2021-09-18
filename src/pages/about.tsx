import React from "react";

export default () => (
  <article className="about">
    <h1>About</h1>
    <div className="card fixed block">
      <section className="description">
        <p>
          A simple news feed that I put togeter to scrap news items from sites I
          frequent. This also rolls-up duplicate posts across sites so we don't
          get duplicate cards. The site gets refreshed once an hour to pull in
          new content.
        </p>
        <p>Enjoy!</p>
      </section>

      <section>
        <p>What I used to build it:</p>
        <div className="news-button-container">
          <a
            className="block news-button"
            href="https://github.com/react-static/react-static"
          >
            reac-static
          </a>
          <a
            className="block news-button"
            href="https://github.com/matthewmueller/x-ray"
          >
            x-ray
          </a>
          <a
            className="block news-button"
            href="https://thesephist.github.io/blocks.css/"
          >
            blocks.css
          </a>
        </div>
      </section>

      <section>
        <p>Source can be found here:</p>
        <div className="news-button-container">
          <a className="news-button block" href="">
            Github
          </a>
        </div>
      </section>

      <hr />

      <section>
        Have questions or spot an issue?:{" "}
        <a className="news-button block accent" href="">
          Report an issue here!
        </a>
      </section>
    </div>
  </article>
);
