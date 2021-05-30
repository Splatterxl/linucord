

for file in src/**/*.ts src/*.ts

    if not grep -q Copyright "$file"
      cat assets/licenseHeader.txt "$file" > "$file.licensed" && mv "$file.licensed" "$file"
      echo "Added license to file $file"
      git add $file
    end
end
