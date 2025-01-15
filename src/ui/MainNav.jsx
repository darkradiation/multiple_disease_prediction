import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";
import { FaBrain, FaDisease, FaLungs } from "react-icons/fa";
import { GiHeartOrgan, GiKidneys, GiLiver } from "react-icons/gi";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);

    /* border: var(--color-grey-100); */
    /* box-shadow: var(--shadow-lg); */
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        {/* <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li> */}
        {/* <li>
          <StyledNavLink to="/all_disease_prediction">
            <FaDisease />
            <span>All Disease</span>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="/diabetes_prediction">
            <FaDisease />
            <span>Diabetes</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/heart_disease_prediction">
            <GiHeartOrgan />
            <span>Heart Disease</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/parkinson_prediction">
            <FaBrain />
            <span>Parkinson</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/liver_prediction">
            <GiLiver />
            <span>Liver</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/hepatitis_prediction">
            <GiLiver />
            <span>Hepatitis</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/lung_cancer_prediction">
            <FaLungs />
            <span>Lung Cancer</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/chronic_kidney_prediction">
            <GiKidneys />
            <span>Chronic Kidney</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/breast_cancer_prediction">
            <FaDisease />
            <span>Breast Cancer</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
