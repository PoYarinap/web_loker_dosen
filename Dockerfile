# Menggunakan Node.js versi 18
FROM node:18-alpine

# Set folder kerja di dalam server
WORKDIR /app

# Copy file package.json untuk install library
COPY package*.json ./

# Install semua library (dependencies)
RUN npm install

# Copy semua kode project kamu ke server
COPY . .

# Build project Next.js kamu
RUN npm run build

# Menjalankan aplikasi di port 3000
EXPOSE 3000
CMD ["npm", "run", "start"]