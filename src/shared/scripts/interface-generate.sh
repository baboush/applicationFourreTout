#!/bin/bash

# Get the number of interfaces from the user
read -p "Enter the number of interfaces to generate: " numberOfInterfaces

# Check if the number of interfaces is a valid numeric value
if [[ ! "$numberOfInterfaces" =~ ^[0-9]+$ ]]; then
	echo "Error: Invalid number of interfaces. Please enter a positive integer."
	exit 1
fi

# Get the target path from the user
read -p "Enter the target path for generating interfaces: " targetPath

# Check if the target path exists and is writable
if [ ! -d "$targetPath" ] || [ ! -w "$targetPath" ]; then
	echo "Error: Target path '$targetPath' does not exist or is not writable."
	exit 1
fi

# Get interface names from the user
interfaceNames=()
for ((i = 1; i <= $numberOfInterfaces; i++)); do
	read -p "Enter the name for interface $i: " interfaceName
	interfaceNames+=("$interfaceName")
done

# Iterate through interface names and generate each interface
for interfaceName in "${interfaceNames[@]}"; do
	# Generate interface in the target path
	nest g itf "$targetPath/$interfaceName" --flat --no-spec
done

echo "Interfaces generated successfully in the target path: $targetPath"
