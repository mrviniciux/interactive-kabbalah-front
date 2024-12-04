import styled from 'styled-components';

export const KabbalahTreeContainerStyled = styled.div`
  visibility: visible;

  .sephirot-container > svg.path {
    position: absolute;
    z-index: -1;
  }

  .sephirot-container > svg.path.beth {
    top: 2.5rem;
    left: 30%;
  }

  .sephirot-container > svg.path.aleph {
    top: 2.5rem;
    right: 30%;
  }

  .sephirot-container > svg.path.chet,
  .sephirot-container > svg.path.vav {
    top: 14%;
  }

  .sephirot-container > svg.path.chet {
    left: 29.5%;
  }
  .sephirot-container > svg.path.vav {
    right: 29.5%;
  }

  .sephirot-container > svg.path.daleth {
    top: 14rem;
  }
`;