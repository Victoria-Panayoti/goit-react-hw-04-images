import { LoadMoreBtn } from 'components/Button/Button.styled';
import styled from 'styled-components';

export const ModalImg = styled.img`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
export const ModalBtn = styled(LoadMoreBtn)`
  display: flex;
  margin-top: 12px;
  justify-content:space-around;
`;
