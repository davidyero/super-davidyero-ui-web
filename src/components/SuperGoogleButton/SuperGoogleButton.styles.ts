import styled from '@emotion/styled';

export const Slot = styled.div<{ $disabled: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;
