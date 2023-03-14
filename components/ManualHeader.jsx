import { useEffect } from "react"
import { useMoralis } from "react-moralis"
export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) {
            return
        }

        if (typeof Window !== undefined && window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof Window !== undefined) {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
