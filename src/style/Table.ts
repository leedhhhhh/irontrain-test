import styled from 'styled-components';
import '../App.css';

export const TableContainer = styled.div`
  font-family: 'Noto Sans', sans-serif;

  height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

  &:hover {
    ${(props) =>
      props.onClick &&
      `
      background-color: #e9ecef;
    `}
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
`;

export const ExpandButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #6c757d;
  transition: color 0.2s;

  &:hover {
    color: #343a40;
  }
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const ExpandedRow = styled(TableCell)`
  background-color: #f8f9fa;
  padding: 16px;
`;

export const NoResultWrap = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
