import { rest } from 'msw';

const fruits = [
  {
    id: 1,
    img: 'https://cdn.imweb.me/thumbnail/20200715/53fa50226803f.jpg',
    name: '거창 오가네체리자두 3kg 한 상자',
    price: 36000, // 정가
    salePrice: 29000, //세일가
    isSale: true, //세일 여부
    salePercent: 10, //세일 비율(%)
    shippingFlag: 0, //배송비 여부 0:무료배송, 1:조건부 배송, 2: 배송비 있음
    shippingPrice: 3000, //2일때만 가격 붙이고 나머지는 null 처리
    saleFlag: 1, //  0:판매중, 1: 현재 판매 기간이 아님, 2:SOLD OUT
    chip: ['BEST', 'SALE', 'MD'], //사진 왼쪽 위 칩
  },
  {
    id: 2,
    img: 'https://cdn.imweb.me/thumbnail/20220622/87364a62fbe94.jpg',
    name: '무농약 GAP 인증 국산 청양 블루베리 2kg, 4kg, 5kg',
    price: 120000,
    salePrice: 52000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 1,
    shippingPrice: 3000,
    saleFlag: 2,
    chip: ['BEST'],
  },
  {
    id: 3,
    img: 'https://cdn.imweb.me/thumbnail/20220622/07e803a25cad0.jpg',
    name: '국산 강원도 화천 생 아스파라거스 1kg, 2kg',
    price: 40000,
    salePrice: 30000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 2,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 4,
    img: 'https://cdn.imweb.me/thumbnail/20220610/57a69b42b7edf.jpg',
    name: '목감기에 좋은 건더기 없는 프리미엄 수제 착즙 유자청',
    price: 15000,
    salePrice: 13300,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 5,
    img: 'https://cdn.imweb.me/thumbnail/20220714/bee59383a4759.jpeg',
    name: '돌다리농원 100% 예산 순수생사과즙 100포(50포X2BOX 묶음상품)',
    price: 60000,
    salePrice: 57000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 6,
    img: 'https://cdn.imweb.me/thumbnail/20220714/d71818e784773.jpeg',
    name: '반려동물과자 아기과자 동결건조 사과칩 50g',
    price: 36000,
    salePrice: 29000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 7,
    img: 'https://cdn.imweb.me/thumbnail/20220520/283df683851b8.png',
    name: '100% 제주감귤주스(15팩 X 1box)',
    price: 50000,
    salePrice: 22500,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 8,
    img: 'https://cdn.imweb.me/thumbnail/20220520/a57222f5689fc.png',
    name: '물에 타먹는 제주 수제 감귤칩(10봉지 X1Box)',
    price: 60000,
    salePrice: 25000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 9,
    img: 'https://cdn.imweb.me/thumbnail/20220622/df2bb0824be20.jpg',
    name: '청양 전통 수제 간장 500ml',
    price: 16000,
    salePrice: 12500,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 10,
    img: 'https://cdn.imweb.me/thumbnail/20220622/8bd6568d69b90.jpg',
    name: '전통 재래식 메주로 띄운 수제 된장',
    price: 60000,
    salePrice: 19000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['BEST'],
  },
  {
    id: 11,
    img: 'https://cdn.imweb.me/thumbnail/20220622/73c0c654c2797.jpg',
    name: '구기자 발효 수제 고추장',
    price: 70000,
    salePrice: 25000,
    isSale: true,
    salePercent: 10,
    shippingFlag: 0,
    shippingPrice: 3000,
    saleFlag: 0,
    chip: ['best'],
  },
];

export const handlers = [
  //상품 조회
  rest.get('/getfruits', async (req, res, ctx) => {
    const perPage = 10;

    const page = req.url.searchParams.get('page');
    const chip = req.url.searchParams.get('chip');

    const fruitsCopy = fruits.slice(0);
    const filteredFruits = fruitsCopy.filter(fruit => {
      if (!chip) return true;

      if (fruit.chip.includes(chip)) {
        return true;
      } else {
        return false;
      }
    });

    const result = [];
    for (let i = 0; i < filteredFruits.length; i += perPage) {
      result.push(filteredFruits.slice(i, i + perPage));
    }

    const returnPageData = result[Number(page) - 1];
    const meta = { pagination: Math.ceil(filteredFruits.length / perPage) };
    return res(
      ctx.status(200),
      ctx.json({
        meta,
        returnPageData,
      })
    );
  }),

  //상품 추가
  rest.post('/fruit', (req, res, ctx) => {
    const body = req.body;

    fruits.push({
      ...body,
      id: fruits.length - 1,
    });
    return res(ctx.status(201));
  }),

  //상품 수정
  rest.put('/fruit', (req, res, ctx) => {
    const body = req.body;
    const id = req.url.searchParams.get('id');
    fruits.splice(
      fruits.findIndex(item => item.id === Number(id)),
      1,
      body
    );
    return res(ctx.status(201));
  }),

  //상품 삭제
  rest.delete('/fruit', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    fruits.splice(
      fruits.findIndex(item => item.id === Number(id)),
      1
    );

    return res(ctx.status(200));
  }),

  //상품 상세 조회
  rest.get('/fruit', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const data = fruits.find(item => item.id === Number(id));

    return res(
      ctx.status(200),
      ctx.json({
        data,
      })
    );
  }),
];
