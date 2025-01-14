module.exports = {
  testEnvironment: 'jsdom', // React 컴포넌트 테스트를 위한 환경
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' // Babel을 사용하여 파일 변환
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // 파일 확장자 지원
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy' // CSS 파일 무시 처리
  },
  transformIgnorePatterns: ['\\.css$'],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/@testing-library/jest-dom',
    'jest-styled-components'
  ]
};
