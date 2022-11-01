function handleError(error) {
  if (error.cause.code === 'ENOTFOUND') {
    return 'Link not found.'
  } else {
    return 'Something went wrong.'
  }
}

async function checkStatus(urlList) {
  const arrStatus = await Promise.all(
    urlList.map(async (url) => {
      try {
        const response = await fetch(url);

        return response.status;
      } catch (error) {
        return handleError(error);
      }
    })
  );

  return arrStatus;
}

function extractLinks(arrLinks) {
  const urlList = arrLinks.map((linkObj) => Object.values(linkObj).join());

  return urlList;
}

export default async function validateList(linksList) {
  const URLs = extractLinks(linksList);
  const statusList = await checkStatus(URLs);

  return linksList.map((link, index) => ({
    ...link,
    status: statusList[index]
  }));
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)