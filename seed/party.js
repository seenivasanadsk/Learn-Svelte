import { redText } from '../commands/helpers/formatText.js';
import { partyCreateModel } from '../src/lib/features/party/party.model.js'
import { partySchema } from '../src/lib/features/party/party.schema.js'

const party = [
  {
    name: "ADS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "AGS",
    phone: [{ name: 'primary', number: "9894217717" }],
    note: '',
    isActive: true
  },
  {
    name: "Akbar Kousar",
    phone: [{ name: 'primary', number: "9751066446" }],
    note: '',
    isActive: true
  },
  {
    name: "Anandhan Auditor",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Anbu Alangayam",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Annamalayar Lorry",
    phone: [{ name: 'primary', number: "9443348605" }],
    note: '',
    isActive: true
  },
  {
    name: "Annasamy Lorry",
    phone: [{ name: 'primary', number: "9626803399" }],
    note: '',
    isActive: true
  },
  {
    name: "Apollo Traders",
    phone: [{ name: 'primary', number: "9443492925" }],
    note: '',
    isActive: true
  },
  {
    name: "Asif Bhai",
    phone: [{ name: 'primary', number: "9842325213" }],
    note: '',
    isActive: true
  },
  {
    name: "AVM Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "AVR Lorry",
    phone: [{ name: 'primary', number: "8098821310" }],
    note: '',
    isActive: true
  },
  {
    name: "Babu Auto",
    phone: [{ name: 'primary', number: "9003810729" }],
    note: '',
    isActive: true
  },
  {
    name: "Babu Mesthiri",
    phone: [{ name: 'primary', number: "9443872492" }],
    note: '',
    isActive: true
  },
  {
    name: "Bath Auto",
    phone: [{ name: 'primary', number: "9003810729" }],
    note: '',
    isActive: true
  },
  {
    name: "BK Mani",
    phone: [{ name: 'primary', number: "9698869671" }],
    note: '',
    isActive: true
  },
  {
    name: "BKP Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "College Principal",
    phone: [{ name: 'primary', number: "9486528846" }],
    note: '',
    isActive: true
  },
  {
    name: "CSK",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "DKP Lorry",
    phone: [{ name: 'primary', number: "9789451911" }],
    note: '',
    isActive: true
  },
  {
    name: "DR Lorry",
    phone: [{ name: 'primary', number: "9786339076" }],
    note: '',
    isActive: true
  },
  {
    name: "Elavarasan",
    phone: [{ name: 'primary', number: "9943644105" }],
    note: '',
    isActive: true
  },
  {
    name: "Eniyavan Auto",
    phone: [{ name: 'primary', number: "9843719307" }],
    note: '',
    isActive: true
  },
  {
    name: "Forest Babu",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Forest Office",
    phone: [{ name: 'primary', number: "9443541922" }],
    note: '',
    isActive: true
  },
  {
    name: "Ganesh Babu",
    phone: [{ name: 'primary', number: "8939908357" }],
    note: '',
    isActive: true
  },
  {
    name: "Ganesh Tracktor",
    phone: [{ name: 'primary', number: "8072258461" }],
    note: '',
    isActive: true
  },
  {
    name: "GSK",
    phone: [{ name: 'primary', number: "9003370713" }],
    note: '',
    isActive: true
  },
  {
    name: "GSK Manager",
    phone: [{ name: 'primary', number: "9047469066" }],
    note: '',
    isActive: true
  },
  {
    name: "Guna Manager",
    phone: [{ name: 'primary', number: "8489614965" }],
    note: '',
    isActive: true
  },
  {
    name: "GVM Lorry",
    phone: [{ name: 'primary', number: "9943657909" }],
    note: '',
    isActive: true
  },
  {
    name: "Hari Ohm Balaji Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Ikbal Road Majid",
    phone: [{ name: 'primary', number: "8667398453" }],
    note: '',
    isActive: true
  },
  {
    name: "Irshad Bhai",
    phone: [{ name: 'primary', number: "9443390157" }],
    note: '',
    isActive: true
  },
  {
    name: "Islamiah College",
    phone: [{ name: 'primary', number: "9894150004" }],
    note: '',
    isActive: true
  },
  {
    name: "Islamiah School",
    phone: [{ name: 'primary', number: "9894958145" }],
    note: '',
    isActive: true
  },
  {
    name: "Jagadisan",
    phone: [{ name: 'primary', number: "9751545991" }],
    note: '',
    isActive: true
  },
  {
    name: "Jamal Bhai",
    phone: [{ name: 'primary', number: "8220544004" }],
    note: '',
    isActive: true
  },
  {
    name: "JKT",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "JNS Lorry",
    phone: [{ name: 'primary', number: "9443091305" }],
    note: '',
    isActive: true
  },
  {
    name: "JPP",
    phone: [{ name: 'primary', number: "9787852862" }],
    note: '',
    isActive: true
  },
  {
    name: "Juber Bhai",
    phone: [{ name: 'primary', number: "8925393141" }],
    note: '',
    isActive: true
  },
  {
    name: "Kalam School",
    phone: [{ name: 'primary', number: "9043344080" }],
    note: '',
    isActive: true
  },
  {
    name: "Kandavel Trackter",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kavi Soap",
    phone: [{ name: 'primary', number: "8220162433" }],
    note: '',
    isActive: true
  },
  {
    name: "Krishna Lorry",
    phone: [{ name: 'primary', number: "9003875894" }],
    note: '',
    isActive: true
  },
  {
    name: "Krishnamoorthy Mayilparai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Krishnamoorthy Mesthiri",
    phone: [{ name: 'primary', number: "9751436645" }],
    note: '',
    isActive: true
  },
  {
    name: "KSM Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kumaran Lorry",
    phone: [{ name: 'primary', number: "8110011838" }],
    note: '',
    isActive: true
  },
  {
    name: "KVS Lorry",
    phone: [{ name: 'primary', number: "9080851773" }],
    note: '',
    isActive: true
  },
  {
    name: "Lakshmi Store",
    phone: [{ name: 'primary', number: "9443882405" }],
    note: '',
    isActive: true
  },
  {
    name: "LMK Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "LNV Lorry",
    phone: [{ name: 'primary', number: "9786044807" }],
    note: '',
    isActive: true
  },
  {
    name: "LSK Yelagiri",
    phone: [{ name: 'primary', number: "9789395555" }],
    note: '',
    isActive: true
  },
  {
    name: "MA Lorry",
    phone: [{ name: 'primary', number: "9787471898" }],
    note: '',
    isActive: true
  },
  {
    name: "Mani Meson",
    phone: [{ name: 'primary', number: "9585713174" }],
    note: '(lalayeri)',
    isActive: true
  },
  {
    name: "Manigandan Pudur",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Marapattu HB",
    phone: [{ name: 'primary', number: "9677790437" }],
    note: '',
    isActive: true
  },
  {
    name: "MBS Lorry",
    phone: [{ name: 'primary', number: "9944090662" }],
    note: '',
    isActive: true
  },
  {
    name: "Mel Nimmiyampattu Party",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MKB Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MKR",
    phone: [{ name: 'primary', number: "9626076801" }],
    note: '',
    isActive: true
  },
  {
    name: "Moorthi Jamunamathur",
    phone: [{ name: 'primary', number: "9751555945" }],
    note: '',
    isActive: true
  },
  {
    name: "MPM Lorry",
    phone: [{ name: 'primary', number: "9843352185" }],
    note: '',
    isActive: true
  },
  {
    name: "MRT Lorry",
    phone: [{ name: 'primary', number: "8098978696" }],
    note: '',
    isActive: true
  },
  {
    name: "MSS Lorry",
    phone: [{ name: 'primary', number: "9943676089" }],
    note: '',
    isActive: true
  },
  {
    name: "Mukthiyar Bhai",
    phone: [{ name: 'primary', number: "9994178380" }],
    note: '',
    isActive: true
  },
  {
    name: "Mullai Bunk, Marapattu",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Munivel Poongulam",
    phone: [{ name: 'primary', number: "6380423002" }],
    note: '',
    isActive: true
  },
  {
    name: "Murugesan Tractor",
    phone: [{ name: 'primary', number: "6369756856" }],
    note: '',
    isActive: true
  },
  {
    name: "Narayana Mesthiri",
    phone: [{ name: 'primary', number: "9626919356" }],
    note: '',
    isActive: true
  },
  {
    name: "Nashir Bhai",
    phone: [{ name: 'primary', number: "7010090516" }],
    note: '',
    isActive: true
  },
  {
    name: "Naveed Traders",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Nawaz Bhai",
    phone: [{ name: 'primary', number: "9543392196" }],
    note: '',
    isActive: true
  },
  {
    name: "Ns & Co",
    phone: [{ name: 'primary', number: "9443687211" }],
    note: '',
    isActive: true
  },
  {
    name: "Palanimurugan Lorry",
    phone: [{ name: 'primary', number: "8870100327" }],
    note: '',
    isActive: true
  },
  {
    name: "Parthiban Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Party T",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Pattabi",
    phone: [{ name: 'primary', number: "9025088855" }],
    note: '',
    isActive: true
  },
  {
    name: "PKP",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PMC Lorry",
    phone: [{ name: 'primary', number: "9902564857" }],
    note: '',
    isActive: true
  },
  {
    name: "Ragavendra Electrical",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Ramesh Tracktor",
    phone: [{ name: 'primary', number: "9943673865" }],
    note: '',
    isActive: true
  },
  {
    name: "RMD Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sarathi VNB",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Saravana Cement",
    phone: [{ name: 'primary', number: "9751845554" }],
    note: '',
    isActive: true
  },
  {
    name: "Saravanan Manager",
    phone: [{ name: 'primary', number: "8946014913" }],
    note: '',
    isActive: true
  },
  {
    name: "Saravanan Mesthiri",
    phone: [{ name: 'primary', number: "9751834447" }],
    note: '',
    isActive: true
  },
  {
    name: "Sathyam Construction",
    phone: [{ name: 'primary', number: "9841094166" }],
    note: '',
    isActive: true
  },
  {
    name: "SDK",
    phone: [{ name: 'primary', number: "9751371706" }],
    note: '',
    isActive: true
  },
  {
    name: "Seenivasan Eng",
    phone: [{ name: 'primary', number: "9092278533" }],
    note: '',
    isActive: true
  },
  {
    name: "Sekar Mesthiri",
    phone: [{ name: 'primary', number: "9366121416" }],
    note: '',
    isActive: true
  },
  {
    name: "Shakil Bhai",
    phone: [{ name: 'primary', number: "9043298793" }],
    note: '',
    isActive: true
  },
  {
    name: "Shiva T",
    phone: [{ name: 'primary', number: "8883278420" }],
    note: '',
    isActive: true
  },
  {
    name: "Shivaji",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Shivaji Theater",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sivakumar P",
    phone: [{ name: 'primary', number: "8248283917" }],
    note: '',
    isActive: true
  },
  {
    name: "SJV Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SMLS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SMT Lorry",
    phone: [{ name: 'primary', number: "9894920959" }],
    note: '',
    isActive: true
  },
  {
    name: "Sokkalingam Ri",
    phone: [{ name: 'primary', number: "9944226604" }],
    note: '',
    isActive: true
  },
  {
    name: "SPT Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SRS Lorry",
    phone: [{ name: 'primary', number: "9344465787" }],
    note: '',
    isActive: true
  },
  {
    name: "SSS Construction",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Subramani (GSK)",
    phone: [{ name: 'primary', number: "9003370713" }],
    note: '',
    isActive: true
  },
  {
    name: "Thimanur HB",
    phone: [{ name: 'primary', number: "9787106059" }],
    note: '',
    isActive: true
  },
  {
    name: "Thulasi Mesthiri",
    phone: [{ name: 'primary', number: "6369309990" }],
    note: '',
    isActive: true
  },
  {
    name: "TLG",
    phone: [{ name: 'primary', number: "6382806365" }],
    note: '',
    isActive: true
  },
  {
    name: "Utham Cl Road",
    phone: [{ name: 'primary', number: "6381104504" }],
    note: '',
    isActive: true
  },
  {
    name: "Vanitech",
    phone: [{ name: 'primary', number: "9443368704" }],
    note: '',
    isActive: true
  },
  {
    name: "Vijay HB",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Vijay Medical",
    phone: [{ name: 'primary', number: "9786133323" }],
    note: '',
    isActive: true
  },
  {
    name: "VNK Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VNM",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VRM",
    phone: [{ name: 'primary', number: "9442664097" }],
    note: '',
    isActive: true
  },
  {
    name: "VSL HB",
    phone: [{ name: 'primary', number: "6382697485" }],
    note: '',
    isActive: true
  },
  {
    name: "Yalini Traders",
    phone: [{ name: 'primary', number: "6379511876" }],
    note: '',
    isActive: true
  },
  {
    name: "HM Rafiq",
    phone: [{ name: 'primary', number: "9443490952" }],
    note: '',
    isActive: true
  },
  {
    name: "MKR Rajendiran",
    phone: [{ name: 'primary', number: "9894785661" }],
    note: '',
    isActive: true
  },
  {
    name: "Party 909",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Janatha Patrai",
    phone: [{ name: 'primary', number: "9500919724" }],
    note: '',
    isActive: true
  },
  {
    name: "Party Auto",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "LSS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Amir Bhai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mani Mesan",
    phone: [{ name: 'primary', number: "9787461683" }],
    note: '',
    isActive: true
  },
  {
    name: "Moorthy JPT",
    phone: [{ name: 'primary', number: "9789602547" }],
    note: '',
    isActive: true
  },
  {
    name: "KBR Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sml Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Bethapalliyamman Kovil",
    phone: [{ name: 'primary', number: "9943310139" }],
    note: '',
    isActive: true
  },
  {
    name: "Party 912",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Ohm Muruga Construction",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Malaivasan Construction",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Gokul Motors",
    phone: [{ name: 'primary', number: "8072946034" }],
    note: '',
    isActive: true
  },
  {
    name: "Emrold Leather",
    phone: [{ name: 'primary', number: "9443353551" }],
    note: '',
    isActive: true
  },
  {
    name: "Ashokan Jabrabath",
    phone: [{ name: 'primary', number: "7845651972" }],
    note: '',
    isActive: true
  },
  {
    name: "GSK Kumar",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "KK Shoes",
    phone: [{ name: 'primary', number: "9597300488" }],
    note: '',
    isActive: true
  },
  {
    name: "MLS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MLS Lorry, Mullai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kumar Driving School",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Dhashnamoorthy",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SR Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "GBR Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PMS",
    phone: [{ name: 'primary', number: "9786715459" }],
    note: '',
    isActive: true
  },
  {
    name: "BKB Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Seeni Driver",
    phone: [{ name: 'primary', number: "7667535780" }],
    note: '',
    isActive: true
  },
  {
    name: "Suresh Driver",
    phone: [{ name: 'primary', number: "9655727874" }],
    note: '',
    isActive: true
  },
  {
    name: "ANU Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "College Hostal",
    phone: [{ name: 'primary', number: "9894150004" }],
    note: '',
    isActive: true
  },
  {
    name: "Mano Vellakuttai",
    phone: [{ name: 'primary', number: "9943626069" }],
    note: '',
    isActive: true
  },
  {
    name: "Munisamy",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Palani Mesthiri",
    phone: [{ name: 'primary', number: "8754179172" }],
    note: '',
    isActive: true
  },
  {
    name: "Periyapettai Iyer",
    phone: [{ name: 'primary', number: "9743955052" }],
    note: '',
    isActive: true
  },
  {
    name: "Sankar Konnampatti",
    phone: [{ name: 'primary', number: "9150652961" }],
    note: '',
    isActive: true
  },
  {
    name: "Subramani Driver",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SVM Lorry",
    phone: [{ name: 'primary', number: "9786373636" }],
    note: '',
    isActive: true
  },
  {
    name: "Thirumalai Vellakuttai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Track Computer",
    phone: [{ name: 'primary', number: "9095714888" }],
    note: '',
    isActive: true
  },
  {
    name: "Mohan Mosic",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "ATA",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Seenivasan Ternary",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SRM Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "DRS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Thirumalai BUNK",
    phone: [{ name: 'primary', number: "9944342861" }],
    note: '',
    isActive: true
  },
  {
    name: "Prime Engineers",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "RKS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Varathan",
    phone: [{ name: 'primary', number: "9003763662" }],
    note: '',
    isActive: true
  },
  {
    name: "Gopal Lorry",
    phone: [{ name: 'primary', number: "9790001768" }],
    note: '',
    isActive: true
  },
  {
    name: "Thirupathi",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Bangaru Cleaner",
    phone: [{ name: 'primary', number: "9442744676" }],
    note: '',
    isActive: true
  },
  {
    name: "PBJ Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PRR",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Delivery Sheet",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Herbal Garden",
    phone: [{ name: 'primary', number: "9943156731" }],
    note: '',
    isActive: true
  },
  {
    name: "NSH Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "RST",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VBS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VPS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Murugan",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Party",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Yogova",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VDT",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "RKV Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VVA Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "RPM Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SLN",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "GKI Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Iyappan",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "KSG",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mariyamman Kovil",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Naveean Lodge",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Aravindhan",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Palani AL",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kesavandiver",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Asan Jules",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mano Algm",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Dhashnamoorthy Algm",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sunmedikal",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Boopalan Mechanic",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Panner",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Panner Diver",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Selvam Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Balraman Mesthiri",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Govt. Hospital",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PVC Company",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Balaji Opp",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Temple Donation",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mani TPT",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "JK & CO",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Tirupathi",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sivanzhanam",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Karthick",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Shoe Berry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MRLORRY",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MP Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "AR Steel",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Naveen",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Babu VNB",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Selvam",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SSK T",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Rajesh",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sathiya Moorthy",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Vignesh",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Npm",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "KGS Loory",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "CRM",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Light House Bhai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Jagan",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "GSV Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Viji Driver",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "GRV Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MRK",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "JPN Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Karthick BM",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Alangayam Kovil",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mandabam",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "S S K Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Boobathy Advocate",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VMS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "VRS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Rk Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mani Auto",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PAT ",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "PAT Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "KPR LORRY",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MV Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "APN Lorry",
    phone: [{ name: 'primary', number: "9655408325" }],
    note: '',
    isActive: true
  },
  {
    name: "Angu Raj",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "LMS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "LMS Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Apollo Tyre",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Senthil Tyer",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mogan Paarai",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "ADD Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Palani Welder",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Party Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Ponnusamy",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "O Mohanraj School",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mullai GK HB",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kavi Arasu",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Vivekananda School",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Arumugam JCB Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SK Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "GSK Subramani",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Karunai Illam",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MR Steel",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MSK Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MCA",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Gopi Aacharyar",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Raja Mannar",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Sivan Koil",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Kathir Bunk",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Mathubalan Driver",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "JVM Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Asna Tenary",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Radha Kirhsnan",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "MG",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "SJS",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Lakshmi Lorry",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "Taj Traders",
    phone: [],
    note: '',
    isActive: true
  },
  {
    name: "NSM Lorry",
    phone: [],
    note: '',
    isActive: true
  }
];

export const seedData = party.map((p) => {
  const isValid = partySchema.safeParse(p);
  if (isValid.success) {
    return partyCreateModel(p, {}, true)
  }
  else {
    console.log(redText(`Error in Party Data ${p.name}`));
    return null;
  }
})