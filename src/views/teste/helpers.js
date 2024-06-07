import axios from "axios";

export const options = {
  plugins: {
    legend: {
      labels: {
        color: "#e53d00",
      },
    },
    title: {
      display: true,
      text: "Complexidade Ciclomática",
      color: "#e53d00", // Define a cor da fonte do título para verde
    },
  },
};
export const optionsAc = {
  plugins: {
    legend: {
      labels: {
        color: "#e53d00",
      },
    },
    title: {
      display: true,
      text: "Acoplamento",
      color: "#e53d00", // Define a cor da fonte do título para verde
    },
  },
};
function extractPathAfterCom(url) {
  const match = url.match(/\.com(\/[^?#]*)/);
  return match ? match[1] : null;
}

export const fetchRepositoryFiles = async (data) => {
  const url = extractPathAfterCom(data.link);

  const githubToken = "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";
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  try {
    const treeResult = await axios.get(
      `https://api.github.com/repos${url}/git/trees/master?recursive=1`
    );
    const files = treeResult.data.tree.filter((item) => item.type === "blob");

    const fileContentsPromises = files.map(async (file) => {
      if (!/\.(jpg|jpeg|png|gif|mp4|avi|gitignore|svg|txt)$/i.test(file.path)) {
        const contentResult = await axios.get(
          `https://api.github.com/repos${url}/contents/${file.path}`
        );
        return {
          name: file.path,
          content: contentResult.data.content,
          encoding: contentResult.data.encoding,
        };
      }
    });

    const filteredFiles = (await Promise.all(fileContentsPromises)).filter(
      (file) => file !== undefined
    );
    return filteredFiles;
  } catch (error) {
    console.error("Erro ao buscar repositório:", error);
    return [];
  }
};

export const line = `\n${'-'.repeat(150)}`;

   