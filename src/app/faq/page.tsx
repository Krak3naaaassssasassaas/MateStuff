
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/language-context";

export default function FaqPage() {
  const { t } = useLanguage();
  
  const faqItems = [
    {
        question: {
          en: "How do I sell an item on MateStuff?",
          id: "Bagaimana cara menjual barang di MateStuff?"
        },
        answer: {
          en: "To sell, go to your Profile page, click the 'Upload Product' tab, fill in your item's details like name, description, price, and upload a photo. After that, click 'Upload' and your item will appear on the platform.",
          id: "Untuk menjual, buka halaman Profil Anda, klik tab 'Unggah Produk', isi detail barang Anda seperti nama, deskripsi, harga, dan unggah foto. Setelah itu, klik 'Unggah' dan barang Anda akan muncul di platform."
        }
    },
    {
        question: {
          en: "Is it safe to transact here?",
          id: "Apakah aman bertransaksi di sini?"
        },
        answer: {
          en: "We prioritize user safety. All transactions are processed through a secure payment gateway. We also encourage sellers and buyers to communicate transparently before making a transaction.",
          id: "Kami memprioritaskan keamanan pengguna. Semua transaksi diproses melalui gateway pembayaran yang aman. Kami juga mendorong penjual dan pembeli untuk berkomunikasi secara transparan sebelum melakukan transaksi."
        }
    },
    {
        question: {
          en: "How do I know the condition of the item?",
          id: "Bagaimana cara mengetahui kondisi barang?"
        },
        answer: {
          en: "Each product has a condition label such as 'Like New', 'Gently Used', or 'Vintage'. Sellers are also required to provide an honest description of the item's condition.",
          id: "Setiap produk memiliki label kondisi seperti 'Seperti Baru', 'Bekas Terawat', atau 'Vintage'. Penjual juga wajib memberikan deskripsi yang jujur tentang kondisi barang."
        }
    },
    {
        question: {
          en: "Can I bargain for the price?",
          id: "Bisakah saya menawar harga?"
        },
        answer: {
          en: "Some sellers may enable the bargaining feature on their products. If available, you will see a 'Bargain' button on the product page. If not, the listed price is the final price.",
          id: "Beberapa penjual mungkin mengaktifkan fitur tawar-menawar pada produk mereka. Jika tersedia, Anda akan melihat tombol 'Tawar' di halaman produk. Jika tidak, harga yang tercantum adalah harga final."
        }
    },
    {
        question: {
          en: "What should I do if the item received does not match the description?",
          id: "Apa yang harus dilakukan jika barang yang diterima tidak sesuai deskripsi?"
        },
        answer: {
          en: "If the item you receive does not match the description, contact the seller immediately to discuss a solution. If there is no resolution, you can contact our Customer Service team through the 'Contact Us' page for further assistance.",
          id: "Jika barang yang Anda terima tidak sesuai dengan deskripsi, segera hubungi penjual untuk mendiskusikan solusinya. Jika tidak ada penyelesaian, Anda dapat menghubungi tim Customer Service kami melalui halaman 'Hubungi Kami' untuk bantuan lebih lanjut."
        }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('faqTitle')}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{t('faqSubtitle')}</p>
        </div>
        <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left">{item.question[t.language]}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                            {item.answer[t.language]}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </div>
  );
}
