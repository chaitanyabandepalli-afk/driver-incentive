const dns = require('dns');

function resolve(host) {
  console.log(`\nResolving: ${host}`);
  dns.resolve4(host, (err, addresses) => {
    if (err) console.log(`IPv4: Error: ${err.message}`);
    else console.log(`IPv4:`, addresses);
  });
  dns.resolve6(host, (err, addresses) => {
    if (err) console.log(`IPv6: Error: ${err.message}`);
    else console.log(`IPv6:`, addresses);
  });
}

resolve('db.yajnfxdkixcebhklrojj.supabase.co');
resolve('aws-0-ap-northeast-1.pooler.supabase.com');
