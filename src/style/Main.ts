import styled from 'styled-components';

interface SpanProps {
  isFocused: boolean;
}

export const MainContainerWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 150px;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 12px;

  display: flex;
  flex-direction: row-reverse;
`;

export const SearchInput = styled.input`
  position: relative;
  width: 300px;
  border: 0;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;

  outline: none;
`;

export const SearchInputSpan = styled.span`
  position: absolute;
  bottom: 0;

  height: 2px;
  background-color: #6c757d;
  transition: 0.4s;
`;
