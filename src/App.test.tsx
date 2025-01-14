import React, { useEffect } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import fetchData from './api/table/list/route';

// 테스트를 위한 목데이터 100개 세팅
jest.mock('./api/table/list/route', () => ({
  default: jest.fn(() =>
    Promise.resolve({
      data: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `이동형`,
        website: `www.example${i + 1}.com`
      }))
    })
  )
}));

describe('App Component', () => {
  // 1. 컴포넌트 렌더링 테스트
  test('component 렌더링 되는가', async () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Expand')).toBeInTheDocument();
  });

  // 2. 초기 데이터 로드 테스트
  test('초기 데이터 로드 테스트', async () => {
    render(<App />);
    // findByText는 해당 텍스트가 화면에 나타날 때까지 기다립니다.
    const text = await screen.findByText('이동형');
    expect(text).toBeInTheDocument();
  });
});
