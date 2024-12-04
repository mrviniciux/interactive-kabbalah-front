interface Props {
  className?: string;
  type: 'vertical' | 'horizontal' | 'diagonal';
  degree?: 35 | 140;
  number?: number;
  letter: string;
  arcane: string;
  sign: string;
}

function Path({
  className,
  type,
  degree,
  arcane,
  number,
  letter,
  sign,
}: Props) {
  const matrix = {
    35: 'matrix(0.819152116776, 0.57357609272, -0.57357609272, 0.819152116776, 0.000032239037, 0.000017759423)', //   ->  \
    140: 'matrix(-0.766044914722, 0.642786979675, -0.642786979675, -0.766044914722, 0.000025774902, 0.000001218199)', // ->  /
  };

  if (type === 'diagonal' && degree) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="107.03 135.9537 272.4089 210.6547"
        width="272.409px"
        height="210.655px"
        preserveAspectRatio="none"
      >
        <path
          d="M 392.813 217.436 L 392.813 241.281 L 392.813 265.126 L 243.235 265.126 L 93.656 265.126 L 93.656 241.281 L 93.656 217.436 L 243.235 217.436 L 392.813 217.436"
          style={{
            fill: 'rgb(250, 233, 15)',
            stroke: 'rgb(255, 255, 255)',
            transformOrigin: '243.234px 241.281px',
          }}
          transform={matrix[degree]}
          id="object-0"
        />
      </svg>
    );
  }

  if (type === 'horizontal') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0.579 217.4358 500 47.6905"
        width="500px"
        height="47.6905px"
      >
        <path
          d="M 500.579 217.436 L 500.579 241.281 L 500.579 265.126 L 250.579 265.126 L 0.579 265.126 L 0.579 241.281 L 0.579 217.436 L 250.579 217.436 L 500.579 217.436"
          style={{
            fill: 'rgb(42, 134, 70)',
            stroke: 'rgb(255, 255, 255)',
            transformOrigin: '250.579px 241.281p',
          }}
          id="object-0"
          transform="matrix(1, 0.000001, -0.000001, 1, -1.7e-11, 1.8e-11)"
        />
      </svg>
    );
  }

  if (type === 'vertical') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="215.8168 15.482 47.6905 475.048"
        width="47.6905px"
        height="475.048px"
      >
        <g id="object-1">
          <path
            d="M 477.186 229.161 L 477.186 253.006 L 477.186 276.851 L 239.662 276.851 L 2.138 276.851 L 2.138 253.006 L 2.138 229.161 L 239.662 229.161 L 477.186 229.161"
            style={{
              stroke: 'rgb(255, 255, 255)',
              fill: 'rgb(248, 194, 54)',
              transformBox: 'fill-box',
              transformOrigin: '50% 50%',
            }}
            id="object-0"
            transform="matrix(-0.000001, 1, -1, -0.000001, 0, -0.000001)"
          />
          <text
            style={{
              whiteSpace: 'pre',
              fill: 'rgb(51, 51, 51)',
              fontFamily: 'Arial, sans-serif',
              fontSize: '20',
            }}
            x="226"
            y="170"
          >
            {number}
          </text>
          <text
            style={{
              fontSize: '25',
              fontFamily: 'Roboto',
              whiteSpace: 'pre',
            }}
            x="229"
            y="215"
          >
            {letter}
          </text>
          <text
            style={{
              fontFamily: 'Roboto',
              fontSize: '20px',
              whiteSpace: 'pre',
            }}
            x="228"
            y="255"
          >
            {sign}
          </text>
          <text
            style={{
              fontFamily: 'Roboto',
              fontSize: '20',
              whiteSpace: 'pre',
            }}
            x="223"
            y="295"
          >
            {arcane}
          </text>
        </g>
      </svg>
    );
  }

  return <div>path</div>;
}

export default Path;