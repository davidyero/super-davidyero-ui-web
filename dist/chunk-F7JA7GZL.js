import { space } from './chunk-MULP5OKD.js';
import styled from '@emotion/styled';

var ChoiceWrap = styled.label(({ $disabled }) => ({
  display: "inline-flex",
  alignItems: "flex-start",
  gap: space.sm,
  cursor: $disabled ? "not-allowed" : "pointer",
  opacity: $disabled ? 0.55 : 1,
  userSelect: "none"
}));
var ChoiceHiddenInput = styled.input({
  position: "absolute",
  opacity: 0,
  width: "1px",
  height: "1px",
  margin: 0
});
var ChoiceTexts = styled.span({ display: "flex", flexDirection: "column", gap: "2px" });

export { ChoiceHiddenInput, ChoiceTexts, ChoiceWrap };
