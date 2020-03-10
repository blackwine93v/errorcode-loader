function test() {
  const abc = 'Variable';
  if (!abc) {
    throw new ErrorCode('No variable');
  }

  throw new ErrorCode(`Has variable ${abc}`);
}