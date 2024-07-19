import numpy as np

# Given pp scores
pps = max_pp_values = [
    61.3266, 62.138, 62.387, 62.5019, 62.5443, 63.3095, 63.7806, 64.3054, 64.6528,
    64.7842, 64.8068, 64.9482, 65.8624, 66.0719, 66.0897, 67.2866, 67.2992, 67.4993,
    67.585, 68.1777, 68.2115, 68.3012, 68.5216, 68.7351, 68.8027, 68.9123, 69.0237,
    69.409, 69.4731, 69.6353, 69.7461, 69.8268, 70.078, 70.2292, 70.3536, 70.448,
    70.6609, 70.7278, 71.3474, 71.4548, 71.5572, 72.1376, 72.342, 72.4668, 72.5198,
    73.5677, 73.6265, 73.6838, 73.7403, 74.0672, 74.1126, 74.1148, 74.2071, 74.7045,
    76.208, 76.4553, 76.8496, 77.0736, 77.8879, 77.9325, 78.1226, 78.5901, 78.9499,
    80.1939, 80.3639, 80.9435, 81.0299, 81.033, 81.1651, 82.284, 82.2961, 82.877,
    82.9, 83.9806, 84.9142, 85.0192, 85.4714, 86.1814, 86.3009, 87.0642, 87.2878,
    87.3663, 87.5319, 87.547, 88.0646, 88.8467, 89.0985, 91.273, 91.5999, 92.1757,
    93.459, 95.466, 96.3521, 97.723, 99.0909, 100.071, 105.107, 105.283, 108.603,
    117.863
]

# Number of bootstrap samples
num_bootstraps = 100000

# Initialize an array to store maximum pp values
max_pps = np.zeros(num_bootstraps)

# Perform bootstrapping
for i in range(num_bootstraps):
    # Resample with replacement
    resample = np.random.choice(pps, size=len(pps), replace=True)
    
    # Calculate the maximum pp for this resample
    max_pps[i] = np.max(resample)

# Calculate the 95% confidence interval
confidence_interval = np.percentile(max_pps, [2.5,2.5,2.5, 20.5])

# Display the results
print("Maximum pp Values from Bootstrapping:", max_pps)
print("95% Confidence Interval for Maximum pp:", confidence_interval)
