import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2a160a] pt-12">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 border-b border-[#3d2010] px-10 pb-10 md:grid-cols-4 md:gap-12">
        <div>
          <h4 className="mb-3 font-serif text-[19px] italic text-[#d4874a]">
            Shanti Ashram
          </h4>
          <p className="max-w-[180px] text-[12.5px] leading-[1.7] text-[#8a6550]">
            A sanctuary of bhakti, gyan, and nishkam seva in the heart of
            Maharashtra.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/SwamiHarichaitanyanandS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] hover:opacity-80"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/swami_harichaitanyaji_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] hover:opacity-80"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@shrigurudevashram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] hover:opacity-80"
            >
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            Visit
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/contact">
              Plan your stay
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/contact">
              Getting here
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/activities">
              Daily schedule
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/contact">
              Accommodation
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            Teachings
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/gurudev">
              Gurudev
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/events">
              Satsang archive
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/gallery">
              Books & media
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/activities">
              Children's programs
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            Connect
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/contact">
              Contact us
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/about">
              Newsletter
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/donate">
              Donate
            </Link>
            <Link className="block text-[13px] hover:text-[#d4a882]" to="/contact">
              Volunteer
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-10 py-4 text-[11.5px] text-[#5a3820]">
        <span>© {currentYear} Shanti Ashram · Pandharpur, Maharashtra</span>
        <span className="normal-case text-[#7a5d4d]">राधे राधे</span>
      </div>
    </footer>
  );
};

export default Footer;
