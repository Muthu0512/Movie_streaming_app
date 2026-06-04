import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-teal-700">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Bulid by{" "}
          <a
            href="https://muthupandi-portfolio-1r6j.onrender.com"
            target="_blank"
            className="font-medium underline underline-offset-4"
            rel="noreferrer"
          >
            {" "}
           Muthupandi
          </a>
          . The source code is available on {"  "}
          <a
            href="https://github.com/Muthu0512/Movie_streaming_app.git"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
           GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
