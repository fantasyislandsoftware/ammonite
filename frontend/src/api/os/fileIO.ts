export const getDirList = async (path: string) => {
  const request = await fetch(`http://localhost:1234/getDirList?path=${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await request.json();
};

export const getFile = async (path: string) => {
  const request = await fetch(`http://localhost:1234/getFile?path=${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await request.json();
};
