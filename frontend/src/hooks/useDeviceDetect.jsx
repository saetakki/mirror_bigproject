import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({query: "(max-width: 767px)"});
  return <>{isMobile && children}</>
}

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({query: "(min-width: 992px)"});
  return <>{isDesktop && children}</>
}

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({query: "(min-width: 768px) and (max-width: 991px)"});
  return <>{isTablet && children}</>
}
