data "oci_identity_availability_domains" "ads" {
  compartment_id = "${var.tenancy_ocid}"
}

# Output the result
output "show-ads" {
  value = "${data.oci_identity_availability_domains.ads.availability_domains}"
}

data "oci_containerengine_clusters" "test_clusters" {
    #Required
    compartment_id = "${var.compartment_id}"
}

# Output the result
output "show-clusters" {
  value = "${data.oci_containerengine_clusters.test_clusters.clusters}"
}

data "oci_core_vcns" "test_vcns" {
    #Required
    compartment_id = "${var.compartment_id}"
}

output "show-vcns" {
  value = "${data.oci_core_vcns.test_vcns.virtual_networks}"
}