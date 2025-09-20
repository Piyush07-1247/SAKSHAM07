import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
  isSlowConnection: boolean;
}

export function useNetworkOptimization() {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: false,
    isInternetReachable: false,
    type: 'UNKNOWN',
    isSlowConnection: false,
  });

  useEffect(() => {
    checkNetworkState();
    
    const interval = setInterval(checkNetworkState, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const checkNetworkState = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      
      setNetworkState({
        isConnected: networkState.isConnected || false,
        isInternetReachable: networkState.isInternetReachable || false,
        type: networkState.type || 'UNKNOWN',
        isSlowConnection: networkState.type === Network.NetworkStateType.CELLULAR,
      });
    } catch (error) {
      console.log('Network check error:', error);
    }
  };

  const getOptimizedVideoQuality = () => {
    if (!networkState.isConnected) return 'offline';
    if (networkState.isSlowConnection) return 'low';
    return 'high';
  };

  const shouldPreloadContent = () => {
    return networkState.isConnected && !networkState.isSlowConnection;
  };

  return {
    networkState,
    getOptimizedVideoQuality,
    shouldPreloadContent,
    checkNetworkState,
  };
}
