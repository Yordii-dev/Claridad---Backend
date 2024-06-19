const getDataByRuc = async (ruc) => {
  const token = "apis-token-8854.rgkYBoGmcjD1M92DakOBmXf-M8RDyadm";

  const response = await fetch(
    `https://api.apis.net.pe/v2/sunat/ruc/full?numero=${ruc}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await response.json();

  return result;
};

module.exports = { getDataByRuc };
