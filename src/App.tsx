import React, { useCallback, useEffect, useRef, useState } from 'react';
import fetchData from './api/table/list/route';
import { customDataProps, dataProps } from './type';
import {
  Checkbox,
  ExpandButton,
  ExpandedRow,
  NoResultWrap,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeader
} from './style/Table';
import {
  MainContainerWrap,
  SearchContainer,
  SearchInput,
  SearchInputSpan
} from './style/Main';
import { SpinnerWheel } from './style/spinner';

function App() {
  const [data, setData] = useState<customDataProps[]>([]);
  const [filteredData, setFilteredData] = useState<customDataProps[]>([]); // 필터링된 데이터
  const [displayData, setDisplayData] = useState<customDataProps[]>([]); // 현재 화면에 보이는 데이터
  const [sortConfig, setSortConfig] = useState<{
    key: null | string;
    direction: string;
  }>({ key: null, direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState({});
  const [scrollIndex, setScrollIndex] = useState<number>(10); // 초기 데이터 로드 갯수
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false); // 끝났는지 여부
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const columnDataList = [
    // 추후 이미지가 생길 수 있으니 주석 처리
    // { name: 'Image', value: 'name' },
    { name: 'Name', value: 'name' },
    { name: 'Gender', value: 'gender' },
    { name: 'Birth Day', value: 'birthday' },
    { name: 'Email', value: 'email' },
    { name: 'WebSite', value: 'website' },
    { name: 'Phone Number', value: 'phNum' }
  ];

  useEffect(() => {
    console.log('Data:', data);
    console.log('Filtered Data:', filteredData);
    console.log('Display Data:', displayData);
  }, [data, filteredData, displayData]);

  // 초기 데이터 세팅
  useEffect(() => {
    const getDataList = async () => {
      try {
        setInitLoading(true);
        const result = await fetchData(
          `/api/v2/persons?_quantity=${scrollIndex}&_gender=female&_birthday_start=2005-01-01`
        );
        const generatedData = result.data.map((item: dataProps) => {
          return {
            id: item.id,
            name: `${item.firstname} ${item.lastname}`,
            address: item.address,
            gender: item.gender,
            birthday: item.birthday,
            email: item.email,
            website: item.website,
            phNum: item.phone,
            image: item.image
          };
        });
        setData(generatedData);
        setFilteredData(generatedData);
        setDisplayData(generatedData.slice(0, scrollIndex));
        setInitLoading(false);
      } catch (err) {
        console.log(err);
        setInitLoading(false);
      }
    };
    getDataList();
  }, []);

  // Scroll 시 데이터 조회
  const fetchMoreData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchData(
        `/api/v2/persons?_quantity=${scrollIndex}&_gender=female&_birthday_start=2005-01-01`
      );

      setIsFinished(true);

      const generatedData = result.data.map((item: dataProps) => {
        return {
          id: item.id,
          name: `${item.firstname} ${item.lastname}`,
          group: item.website,
          username: item.phone,
          address: item.address,
          gender: item.gender,
          birthday: item.birthday,
          email: item.email,
          website: item.website,
          phNum: item.phone,
          image: item.image
        };
      });
      setData((prev) => [...prev, ...generatedData]);
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [scrollIndex, isLoading, isFinished]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const bottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    if (bottom && !isFinished && !isLoading) {
      // 데이터 끝에 도달하지 않았고, 로딩 중이 아닐 때만 실행
      if (scrollIndex < data.length) {
        setScrollIndex((prev) => prev + 20);
        setDisplayData(data.slice(0, scrollIndex + 20));
      } else {
        // 추가 데이터가 없으면 API 호출
        setScrollIndex((prev) => prev + 20);
        setDisplayData(data.slice(0, scrollIndex + 20));
        fetchMoreData();
      }
    }
  }, [scrollIndex, data, isFinished, isLoading, fetchMoreData]);

  // 검색 필터
  useEffect(() => {
    const filtered = data.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setDisplayData(filtered.slice(0, scrollIndex));
    setIsFinished(false); // 검색하면 끝 상태 초기화
  }, [searchQuery, scrollIndex, isFinished]);

  // 정렬
  const handleSort = useCallback(
    (key: null | string) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });

      const sortedData = [...filteredData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });

      setFilteredData(sortedData);
      setDisplayData(sortedData.slice(0, scrollIndex));
    },
    [filteredData, displayData, sortConfig]
  );

  // cell data
  const renderCell = (content, type?: string) => {
    // 추후 image가 생길 수 있으니 일단 삼항연산자로 예외처리
    return type === 'IMAGE' ? (
      <div className="cell cell-image" title={content}>
        <img
          src={content ?? ''}
          alt="image"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </div>
    ) : (
      <div className="cell" title={content}>
        {content ?? 'No data'}
      </div>
    );
  };

  // expand cell data
  const expandCell = (address) => (
    <div>
      <p>buildingNumber: {address.buildingNumber ?? 'No data'}</p>
      <p>city: {address.city ?? 'No data'}</p>
      <p>country: {address.country ?? 'No data'}</p>
      <p>country_code: {address.country_code ?? 'No data'}</p>
      <p>street: {address.street ?? 'No data'}</p>
      <p>streetName: {address.streetName ?? 'No data'}</p>
      <p>zipcode: {address.zipcode ?? 'No data'}</p>
    </div>
  );

  // 반복되는 table 데이터 Component 로 변경
  const renderTableCells = (row: customDataProps) => {
    return (
      <>
        <TableCell>{renderCell(row.name)}</TableCell>
        <TableCell>{renderCell(row.gender)}</TableCell>
        <TableCell>{renderCell(row.birthday)}</TableCell>
        <TableCell>{renderCell(row.email)}</TableCell>
        <TableCell>{renderCell(row.website)}</TableCell>
        <TableCell>{renderCell(row.phNum)}</TableCell>
      </>
    );
  };

  // Sub Rows 토글
  const toggleRow = useCallback(
    (id: number) => {
      setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [expandedRows]
  );

  return (
    <MainContainerWrap>
      {/* 검색 입력 */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <SearchInputSpan
          style={
            isFocused
              ? { left: 'calc(100% - 300px)', width: '300px' }
              : { left: 'calc(100% - 150px)', width: '0' }
          }
        />
      </SearchContainer>
      {/* 테이블 */}

      <TableContainer
        onScroll={handleScroll}
        ref={containerRef}
        data-testid="table-container"
      >
        {initLoading ? (
          <SpinnerWheel />
        ) : (
          <>
            <StyledTable>
              <thead>
                <tr>
                  <TableHeader>Select</TableHeader>
                  <TableHeader>Expand</TableHeader>
                  {columnDataList.map((column) => {
                    return (
                      <TableHeader
                        key={column.name}
                        onClick={() => handleSort(column.value)}
                      >
                        {column.name}
                      </TableHeader>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {displayData.map((row) => (
                  <React.Fragment key={row.id + row.name}>
                    <tr>
                      <TableCell>
                        <Checkbox type="checkbox" />
                      </TableCell>
                      <TableCell>
                        <ExpandButton onClick={() => toggleRow(row.id)}>
                          {expandedRows[row.id] ? '▲' : '▼'}
                        </ExpandButton>
                      </TableCell>
                      {renderTableCells(row)}
                    </tr>
                    {expandedRows[row.id] && (
                      <tr>
                        <ExpandedRow colSpan={9}>
                          {expandCell(row.address)}
                        </ExpandedRow>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </StyledTable>

            {/* 조회할 데이터가 존재하며 로딩 중일 경우 */}
            {isLoading && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <SpinnerWheel />
              </div>
            )}

            {/* 조회할 데이터가 존재하지 않을 경우 */}
            {isFinished && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                Finish
              </div>
            )}
          </>
        )}
      </TableContainer>
    </MainContainerWrap>
  );
}

export default App;
