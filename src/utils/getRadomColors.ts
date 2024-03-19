export function getRadomColors() {
  const colors: string[] = [];
  const color: string[] = [
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'error',
    'success',
    'info',
  ];
  const degree: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  color.forEach(colorItem => {
    degree.forEach(degreeItem => {
      colors.push(colorItem + '.' + degreeItem);
    });
  });
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
