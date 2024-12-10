import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN is not defined');
  }

  // URL 파라미터에서 filepath를 추출
  const { filepath } = event.context.params;
  console.log('Received filepath:', filepath);
  const owner = 'skson0x6ab';
  const repo = 'DataRepository';

  const githubClient = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/contents/${filepath}`);
    const base64Content = response.data.content;
    const binaryString = Buffer.from(base64Content, 'base64').toString('utf-8');
    const jsonData = JSON.parse(binaryString);

    return jsonData;
  } catch (error) {
    throw new Error('GitHub API 요청에 실패했습니다.');
  }
});
