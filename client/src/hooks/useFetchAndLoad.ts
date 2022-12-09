import { useEffect, useState } from "react";
import { FetchCall } from "../models";

export default function useFetchAndLoad() {
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  async function callEndpoint<T>(fetchCall: FetchCall<T>) {
    const { controller, call } = fetchCall;

    setLoading(true);
    setController(controller);

    let data;
    try {
      data = await call;
    } catch (err) {
      setLoading(false);
      setController(null);

      throw err;
    }

    setLoading(false);
    setController(null);

    return data;
  }

  useEffect(() => {
    return () => {
      setLoading(false);
      controller?.abort();
    };
  }, []);

  return { loading, callEndpoint };
}
