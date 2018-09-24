using System;
using System.Security.Cryptography;
using System.Text;

namespace React
{
    public class Encrypter
    {
        public string CalculateHash(string input)
        {
            using (var algorithm = SHA256.Create()) //SHA512, MD5
            {
                var hashedBytes = algorithm.ComputeHash(Encoding.UTF8.GetBytes(input));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}